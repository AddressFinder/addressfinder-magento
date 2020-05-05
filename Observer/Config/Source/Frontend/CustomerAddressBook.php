<?php

namespace AddressFinder\AddressFinder\Observer\Config\Source\Frontend;

use AddressFinder\AddressFinder\Observer\FormConfig\Frontend\AddCustomerAddressBook;
use Exception;
use Magento\Framework\Data\Collection;
use Magento\Framework\DataObject;
use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;

class CustomerAddressBook implements ObserverInterface
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
            'label' => 'Customer Address Book',
            'value' => AddCustomerAddressBook::FORM_ID,
        ]));
    }
}