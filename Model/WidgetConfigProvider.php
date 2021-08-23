<?php

namespace AddressFinder\AddressFinder\Model;

use InvalidArgumentException;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\Serialize\Serializer\Json;
use Magento\Store\Model\ScopeInterface;
use Psr\Log\LoggerInterface;

class WidgetConfigProvider
{
    /** @var Json */
    private $jsonSerializer;

    /** @var LoggerInterface */
    private $logger;

    /** @var ScopeConfigInterface */
    private $scopeConfig;

    public function __construct(
        ScopeConfigInterface $scopeConfig,
        Json $jsonSerializer,
        LoggerInterface $logger
    ) {
        $this->scopeConfig    = $scopeConfig;
        $this->jsonSerializer = $jsonSerializer;
        $this->logger         = $logger;
    }

    /**
     * Returns the licence key.
     */
    public function getLicenceKey(): ?string
    {
        return $this->scopeConfig->getValue('addressfinder/general/licence_key', ScopeInterface::SCOPE_STORE);
    }

    /**
     * Tells if we're in debug mode or not.
     */
    public function isDebugMode(): bool
    {
        return $this->scopeConfig->isSetFlag('addressfinder/general/debug_mode', ScopeInterface::SCOPE_STORE);
    }

    /**
     * Gets the default country
     */
    public function getDefaultSearchCountry(): ?string
    {
        return $this->scopeConfig->getValue('addressfinder/general/default_search_country', ScopeInterface::SCOPE_STORE);
    }

    /**
     * Gets JSON widget options stored in config. Validates the JSON that's returned back prior to sending
     * it to the client side. If the JSON is invalid, a warning will be logged and no options will be
     * passed through to the client side.
     *
     * @return array|string|int|null The data structure that is encoded, typically an associative array
     */
    public function getWidgetOptions()
    {
        /** @var string|null $json */
        $json = $this->scopeConfig->getValue('addressfinder/general/widget_options', ScopeInterface::SCOPE_STORE);

        if (!$json) {
            return null;
        }

        try {
            $decoded = $this->jsonSerializer->unserialize($json);
        } catch (InvalidArgumentException $e) {

            $this->logger->warning(
                sprintf('Failed to decode AddressFinder widget options: "%s"', $e->getMessage()),
                [
                    'json' => $json,
                ]
            );

            return null;
        }

        return !empty($decoded) ? $decoded : null;
    }

    /**
     * Gets all widget configuration.
     */
    public function all(): array
    {
        return [
            'nzKey' => $this->getLicenceKey(),
            'auKey' => $this->getLicenceKey(),
            'nzWidgetOptions' => $this->getWidgetOptions(),
            'auWidgetOptions' => $this->getWidgetOptions(),
            'debug' => $this->isDebugMode(),
            'defaultCountry' => $this->getDefaultSearchCountry()
        ];
    }
}
