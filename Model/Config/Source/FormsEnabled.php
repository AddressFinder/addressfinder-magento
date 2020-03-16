<?php

namespace AddressFinder\AddressFinder\Model\Config\Source;

use AddressFinder\AddressFinder\Observer\FormConfig\Adminhtml;
use AddressFinder\AddressFinder\Observer\FormConfig\Frontend;
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
                        'value' => Frontend\AddCheckoutBillingAddress::FORM_ID,
                    ],
                    [
                        'label' => 'Checkout Shipping Address',
                        'value' => Frontend\AddCheckoutShippingAddress::FORM_ID,
                    ],
                    [
                        'label' => 'Customer Address Book',
                        'value' => Frontend\AddCustomerAddressBook::FORM_ID,
                    ],
                ],
            ],
            [
                'label' => 'Admin',
                'value' => [
                    [
                        'label' => 'Order Billing Address',
                        'value' => Adminhtml\AddOrderBillingAddress::FORM_ID,
                    ],
                    [
                        'label' => 'Order Shipping Address',
                        'value' => Adminhtml\AddOrderShippingAddress::FORM_ID,
                    ],
                ],
            ],
        ];
    }
}