<?php

namespace AddressFinder\AddressFinder\Block;

use AddressFinder\AddressFinder\Model\WidgetConfigProvider;
use Magento\Framework\View\Element\Template;
use Magento\Framework\View\Element\Template\Context as TemplateContext;
use Magento\Store\Model\ScopeInterface;
use Magento\Framework\Json\DecoderInterface;

class AbstractBlock extends Template
{
    /**
     * @var WidgetConfigProvider
     */
    private $configProvider;

    /**
     * @inheritdoc
     *
     * @param DecoderInterface $jsonDecoder
     */
    public function __construct(
        TemplateContext $context,
        WidgetConfigProvider $configProvider,
        array $data = []
    )
    {
        parent::__construct($context, $data);

        $this->configProvider = $configProvider;
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
     * Gets all widget configuration.
     *
     * @return array
     */
    public function getWidgetConfig()
    {
        return $this->configProvider->all();
    }
}
