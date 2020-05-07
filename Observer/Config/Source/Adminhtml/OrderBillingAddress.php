<?php

namespace AddressFinder\AddressFinder\Observer\Config\Source\Adminhtml;

use AddressFinder\AddressFinder\Observer\FormConfig\Adminhtml\AddOrderBillingAddress;
use Exception;
use Magento\Framework\App\ProductMetadataInterface;
use Magento\Framework\Data\Collection;
use Magento\Framework\DataObject;
use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;

class OrderBillingAddress implements ObserverInterface
{
    const CUTOFF_VERSION = '2.2.0';

    /**
     * @var ProductMetadataInterface
     */
    private $productMetadata;

    public function __construct(ProductMetadataInterface $productMetadata)
    {
        $this->productMetadata = $productMetadata;
    }

    /**
     * @inheritDoc
     *
     * @throws Exception
     */
    public function execute(Observer $observer)
    {
        if (!$this->canUse()) {
            return;
        }

        /** @var Collection $adminhtml */
        $adminhtml = $observer->getEvent()->getData('adminhtml');

        $adminhtml->addItem(new DataObject([
            'label' => 'Order Billing Address',
            'value' => AddOrderBillingAddress::FORM_ID,
        ]));
    }

    /**
     * Tells if the form can be used or not.
     *
     * @return bool
     */
    public function canUse()
    {
        return version_compare($this->productMetadata->getVersion(), self::CUTOFF_VERSION, '>=');
    }
}