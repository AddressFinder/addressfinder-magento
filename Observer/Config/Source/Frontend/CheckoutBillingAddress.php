<?php

namespace AddressFinder\AddressFinder\Observer\Config\Source\Frontend;

use AddressFinder\AddressFinder\Observer\FormConfig\Frontend\AddCheckoutBillingAddress;
use Exception;
use Magento\Framework\Data\Collection;
use Magento\Framework\DataObject;
use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;

class CheckoutBillingAddress implements ObserverInterface
{
    /**
     * @inheritDoc
     *
     * @throws Exception
     */
    public function execute(Observer $observer)
    {
        /** @var Collection $frontend */
        $frontend = $observer->getEvent()->getData('frontend');

        $frontend->addItem(new DataObject([
            'label' => 'Checkout Billing Address',
            'value' => AddCheckoutBillingAddress::FORM_ID,
        ]));
    }
}