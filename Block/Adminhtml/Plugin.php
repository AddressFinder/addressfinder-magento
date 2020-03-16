<?php

namespace AddressFinder\AddressFinder\Block\Adminhtml;

use AddressFinder\AddressFinder\Model\FormConfigProvider;
use AddressFinder\AddressFinder\Model\WidgetConfigProvider;
use Magento\Backend\Block\Template;
use Magento\Backend\Block\Template\Context as TemplateContext;
use Magento\Framework\Data\Collection;
use Magento\Framework\Data\CollectionFactory;
use Magento\Store\Model\ScopeInterface;
use Magento\Framework\Json\DecoderInterface;

class Plugin extends Template
{
    /** @var string */
    protected $_template = 'plugin.phtml';

    /**
     * @var WidgetConfigProvider
     */
    private $configProvider;

    /**
     * @var CollectionFactory
     */
    private $collectionFactory;

    /**
     * @var Collection
     */
    private $formsConfig;

    /**
     * @inheritdoc
     *
     * @param DecoderInterface $jsonDecoder
     */
    public function __construct(
        TemplateContext $context,
        WidgetConfigProvider $configProvider,
        CollectionFactory $collectionFactory,
        array $data = []
    )
    {
        parent::__construct($context, $data);

        $this->configProvider = $configProvider;
        $this->collectionFactory = $collectionFactory;
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
        if (null === $this->formsConfig) {
            /** @var Collection $forms */
            $this->formsConfig = $this->collectionFactory->create();

            $this->_eventManager->dispatch(
                'addressfinder_form_config',
                [
                    'area' => FormConfigProvider::AREA_ADMIN,
                    'forms' => $this->formsConfig,
                ]
            );

            if (0 === $this->formsConfig->count()) {
                $this->_logger->warning('There are no configured forms for AddressFinder.');
            }
        }

        return $this->formsConfig;
    }
}
