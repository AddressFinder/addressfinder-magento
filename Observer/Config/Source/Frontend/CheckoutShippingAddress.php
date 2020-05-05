<?php

namespace AddressFinder\AddressFinder\Observer\Config\Source\Frontend;

use AddressFinder\AddressFinder\Observer\FormConfig\Frontend\AddCheckoutShippingAddress;
use Exception;
use Magento\Framework\Data\Collection;
use Magento\Framework\DataObject;
use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;

class CheckoutShippingAddress implements ObserverInterface
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
            'label' => 'Checkout Shipping Address',
            'value' => AddCheckoutShippingAddress::FORM_ID,
        ]));
    }
}