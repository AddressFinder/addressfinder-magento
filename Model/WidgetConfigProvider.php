<?php


namespace AddressFinder\AddressFinder\Model;


use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\Json\DecoderInterface;
use Magento\Store\Model\ScopeInterface;
use Psr\Log\LoggerInterface;
use Zend_Json_Exception;

class WidgetConfigProvider
{
    /**
     * @var DecoderInterface
     */
    private $jsonDecoder;

    /**
     * @var LoggerInterface
     */
    private $logger;
    /**
     * @var ScopeConfigInterface
     */
    private $scopeConfig;

    /**
     * @inheritdoc
     *
     * @param DecoderInterface $jsonDecoder
     */
    public function __construct(
        ScopeConfigInterface $scopeConfig,
        DecoderInterface $jsonDecoder,
        LoggerInterface $logger
    ) {
        $this->scopeConfig = $scopeConfig;
        $this->jsonDecoder = $jsonDecoder;
        $this->logger = $logger;
    }

    /**
     * Returns the licence key.
     *
     * @return string|null
     */
    public function getLicenceKey()
    {
        return $this->scopeConfig->getValue('addressfinder/general/licence_key', ScopeInterface::SCOPE_STORE);
    }

    /**
     * Tells if we're in debug mode or not.
     *
     * @return bool
     */
    public function isDebugMode()
    {
        return $this->scopeConfig->isSetFlag('addressfinder/general/debug_mode', ScopeInterface::SCOPE_STORE);
    }

    /**
     * Gets the default country
     *
     * @return string|null
     */
    public function getDefaultSearchCountry()
    {
        return $this->scopeConfig->getValue('addressfinder/general/default_search_country', ScopeInterface::SCOPE_STORE);
    }

    /**
     * Gets JSON widget options stored in config. Validates the JSON that's returned back prior to sending
     * it to the client side. If the JSON is invalid, a warning will be logged and no options will be
     * passed through to the client side.
     *
     * @return mixed The data structure that is encoded, typically an associative array
     */
    public function getWidgetOptions()
    {
        /** @var string|null $json */
        $json = $this->scopeConfig->getValue('addressfinder/general/widget_options', ScopeInterface::SCOPE_STORE);

        if (!$json) {
            return null;
        }

        try {
            $decoded = $this->jsonDecoder->decode($json);
        } catch (Zend_Json_Exception $e) {
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
     *
     * @return array
     */
    public function all()
    {
        return [
            'key' => $this->getLicenceKey(),
            'options' => $this->getWidgetOptions(),
            'debug' => $this->isDebugMode(),
            'default_country' => $this->getDefaultSearchCountry(),
        ];
    }
}
