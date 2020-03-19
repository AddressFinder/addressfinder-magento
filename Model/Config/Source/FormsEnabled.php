<?php

namespace AddressFinder\AddressFinder\Model\Config\Source;

use AddressFinder\AddressFinder\Observer\FormConfig\Adminhtml;
use AddressFinder\AddressFinder\Observer\FormConfig\Frontend;
use Magento\Framework\App\ProductMetadataInterface;
use Magento\Framework\Data\OptionSourceInterface;
use Magento\Framework\Event\ManagerInterface;

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
        $options = [
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
                'value' => [],
            ],
        ];

        $addOrderBillingAddress = version_compare($this->productMetadata->getVersion(), Adminhtml\AddOrderBillingAddress::CUTOFF_VERSION, '>=');

        if ($addOrderBillingAddress) {
            $options[2]['value'][] = [
                'label' => 'Order Billing Address',
                'value' => Adminhtml\AddOrderBillingAddress::FORM_ID,
            ];
        }

        $addOrderShippingAddress = version_compare($this->productMetadata->getVersion(), Adminhtml\AddOrderShippingAddress::CUTOFF_VERSION, '>=');

        if ($addOrderShippingAddress) {
            $options[2]['value'][] = [
                'label' => 'Order Shipping Address',
                'value' => Adminhtml\AddOrderShippingAddress::FORM_ID,
            ];
        }

        if (0 === count($options[2]['value'])) {
            array_pop($options);
        }

        return $options;
    }
}