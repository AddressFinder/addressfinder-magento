<?php

namespace AddressFinder\AddressFinder\Block;

use AddressFinder\AddressFinder\Model\FormConfigProvider;
use AddressFinder\AddressFinder\Model\WidgetConfigProvider;
use Magento\Framework\Data\Collection;
use Magento\Framework\Data\CollectionFactory;
use Magento\Framework\View\Element\Template;
use Magento\Framework\View\Element\Template\Context as TemplateContext;
use Magento\Store\Model\ScopeInterface;
use Magento\Framework\Json\DecoderInterface;

class Plugin extends Template
{
    const FORM_CONFIG_EVENT = 'addressfinder_form_config';

    /** @var string */
    protected $_template = 'plugin.phtml';

    /** @var WidgetConfigProvider */
    private $configProvider;

    /** @var FormConfigProvider */
    private $formConfigProvider;

    /**
     * @inheritdoc
     *
     * @param DecoderInterface $jsonDecoder
     */
    public function __construct(
        TemplateContext $context,
        WidgetConfigProvider $configProvider,
        FormConfigProvider $formConfigProvider,
        array $data = []
    ) {
        parent::__construct($context, $data);

        $this->configProvider = $configProvider;
        $this->formConfigProvider = $formConfigProvider;
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

    /**
     * Gets forms configuration.
     *
     * @return Collection
     */
    public function getFormsConfig()
    {
        return $this->formConfigProvider->get(self::FORM_CONFIG_EVENT);
    }
}
