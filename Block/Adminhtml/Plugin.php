<?php

namespace AddressFinder\AddressFinder\Block\Adminhtml;

use AddressFinder\AddressFinder\Model\FormConfigProvider;
use AddressFinder\AddressFinder\Model\WidgetConfigProvider;
use Magento\Backend\Block\Template;
use Magento\Backend\Block\Template\Context as TemplateContext;
use Magento\Framework\Data\Collection;
use Magento\Store\Model\ScopeInterface;

class Plugin extends Template
{
    private const FORM_CONFIG_EVENT = 'addressfinder_form_config_admin';

    /** @var string */
    protected $_template = 'plugin.phtml';

    /** @var WidgetConfigProvider */
    private $configProvider;

    /** @var FormConfigProvider */
    private $formConfigProvider;

    /** @inheritdoc */
    public function __construct(
        TemplateContext $context,
        WidgetConfigProvider $configProvider,
        FormConfigProvider $formConfigProvider,
        array $data = []
    ) {
        parent::__construct($context, $data);

        $this->configProvider     = $configProvider;
        $this->formConfigProvider = $formConfigProvider;
    }

    /**
     * Tells if the block is enabled.
     */
    public function isEnabled(): bool
    {
        return $this->_scopeConfig->isSetFlag('addressfinder/general/enabled', ScopeInterface::SCOPE_STORE);
    }

    /**
     * Gets all widget configuration.
     */
    public function getWidgetConfig(): array
    {
        return $this->configProvider->all();
    }

    /**
     * Gets forms configuration.
     */
    public function getFormsConfig(): Collection
    {
        return $this->formConfigProvider->get(self::FORM_CONFIG_EVENT);
    }
}
