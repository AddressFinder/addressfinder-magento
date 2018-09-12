<?php

namespace AddressFinder\AddressFinder\Block;

use Magento\Framework\View\Element\Template;
use Magento\Framework\View\Element\Template\Context as TemplateContext;
use Magento\Store\Model\ScopeInterface;
use Magento\Framework\Json\DecoderInterface;

class AbstractBlock extends Template
{
    /**
     * The JSON decoder.
     *
     * @var DecoderInterface
     */
    private $decoder;

    /**
     * @inheritdoc
     *
     * @param DecoderInterface $jsonDecoder
     */
    public function __construct(
        TemplateContext $context,
        DecoderInterface $jsonDecoder,
        array $data = []
    ) {
        parent::__construct($context, $data);

        $this->jsonDecoder = $jsonDecoder;
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
     * Tells if the block has widget options or not.
     *
     * @return bool
     */
    public function hasWidgetOptions()
    {
        return !!$this->getWidgetOptions();
    }

    /**
     * Gets widget options and validates that they're actually JSON.
     *
     * @return string|null
     */
    public function getWidgetOptions()
    {
        /** @var string|null $json */
        $json = $this->_scopeConfig->getValue('addressfinder/general/widget_options', ScopeInterface::SCOPE_STORE);

        // If there's no JSON, bail out early
        if (!$json) {
            return;
        }

        // We'll just validate the JSON by decoding it. The decoder throws
        // a number of exceptiosn for invalid JSON...
        $this->jsonDecoder->decode($json);

        // If we've got this far, the JSON is valid. Wel'l return the orignal JSON
        // because there's a few ways of re-encoding that could result in some
        // transformation which may not actually be intented by the user.
        return $json;
    }
}
