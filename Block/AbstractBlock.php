<?php

namespace AddressFinder\AddressFinder\Block;

use Magento\Framework\View\Element\Template;
use Magento\Framework\View\Element\Template\Context as TemplateContext;
use Magento\Store\Model\ScopeInterface;
use Magento\Framework\Json\DecoderInterface;
use Psr\Log\LoggerInterface;
use Zend_Json_Exception;

class AbstractBlock extends Template
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
     * @inheritdoc
     *
     * @param DecoderInterface $jsonDecoder
     */
    public function __construct(
        TemplateContext $context,
        DecoderInterface $jsonDecoder,
        LoggerInterface $logger,
        array $data = []
    )
    {
        parent::__construct($context, $data);

        $this->jsonDecoder = $jsonDecoder;
        $this->logger = $logger;
    }

    /**
     * Tells if the block is enabled.
     *
     * @return bool
     */
    public function isEnabled()
    {
        return $this->_scopeConfig->isSetFlag('addressfinder/general/enabled', ScopeInterface::SCOPE_STORE);
    }

    /**
     * Returns the licence key.
     *
     * @return string|null
     */
    public function getLicenceKey()
    {
        return $this->_scopeConfig->getValue('addressfinder/general/licence_key', ScopeInterface::SCOPE_STORE);
    }

    /**
     * Tells if we're in debug mode or not.
     *
     * @return bool
     */
    public function isDebugMode()
    {
        return $this->_scopeConfig->isSetFlag('addressfinder/general/debug_mode', ScopeInterface::SCOPE_STORE);
    }

    /**
     * Gets the default country
     *
     * @return string|null
     */
    public function getDefaultSearchCountry()
    {
        return $this->_scopeConfig->getValue('addressfinder/general/default_search_country', ScopeInterface::SCOPE_STORE);
    }

    /**
     * Gets widget options and escapes any double-quote characters with a backslash. This
     * enables the string to be embedded straight into the HTML (wrapped in quotes).
     *
     * If no widgetOptions are available, then string containing "{}" is returned.
     *
     * @return mixed
     */
    public function getWidgetOptions()
    {
        /** @var string|null $json */
        $json = $this->_scopeConfig->getValue('addressfinder/general/widget_options', ScopeInterface::SCOPE_STORE);

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
    public function getConfig()
    {
        return [
            'key' => $this->getLicenceKey(),
            'options' => $this->getWidgetOptions(),
            'debug' => $this->isDebugMode(),
            'default_country' => $this->getDefaultSearchCountry(),
        ];
    }
}
