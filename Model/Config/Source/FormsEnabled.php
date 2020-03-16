<?php

namespace AddressFinder\AddressFinder\Model\Config\Source;

use AddressFinder\AddressFinder\Observer\FormConfig;
use Magento\Framework\Data\OptionSourceInterface;

class FormsEnabled implements OptionSourceInterface
{
    /**
     * A constant that represents all forms being enabled.
     */
    const ALL = 'all';

    /**
     * Return array of options as value-label pairs, eg. value => label
     *
     * @return array
     */
    public function toOptionArray()
    {
        return [
            [
                'label' => __('All'),
                'value' => self::ALL,
            ],
            [
                'label' => 'Frontend',
                'value' => [
                    [
                        'label' => 'Checkout Billing Address',
                        'value' => FormConfig\AddCheckoutBillingAddress::FORM_ID,
                    ],
                    [
                        'label' => 'Checkout Shipping Address',
                        'value' => FormConfig\AddCheckoutShippingAddress::FORM_ID,
                    ],
                    [
                        'label' => 'Customer Address Book',
                        'value' => FormConfig\AddCustomerAddressBook::FORM_ID,
                    ],
                ],
            ]
        ];
    }
}