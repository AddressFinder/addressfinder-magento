<?php

namespace AddressFinder\AddressFinder\Observer\FormConfig\Adminhtml;

use AddressFinder\AddressFinder\Model\FormConfigProvider;
use AddressFinder\AddressFinder\Observer\FormConfig\Base;
use Exception;
use Magento\Framework\App\ProductMetadataInterface;
use Magento\Framework\Data\Collection;
use Magento\Framework\DataObject;

class AddOrderShippingAddress extends Base
{
    const FORM_ID = 'admin.order.shipping.address';

    const CUTOFF_VERSION = '2.2.0';

    /**
     * @inheritDoc
     *
     * @throws Exception
     */
    protected function addForm(Collection $forms)
    {
        $forms->addItem(new DataObject([
            'id' => self::FORM_ID,
            'label' => 'Order Shipping Address',
            'layoutSelectors' => ['#order-shipping_address_fields'],
            'countryIdentifier' => '#order-shipping_address_country_id',
            'searchIdentifier' => '#order-shipping_address_street0',
            'nz' => [
                'countryValue' => 'NZ',
                'elements' => [
                    'address1' => '#order-shipping_address_street0',
                    'address2' => '#order-shipping_address_street1',
                    'suburb' => '#order-shipping_address_street2',
                    'city' => '#order-shipping_address_city',
                    'region' => '#order-shipping_address_region',
                    'postcode' => '#order-shipping_address_postcode',
                ],
                'regionMappings' => null,
            ],
            'au' => [
                'countryValue' => 'AU',
                'elements' => [
                    'address1' => '#order-shipping_address_street0',
                    'address2' => '#order-shipping_address_street1',
                    'suburb' => '#order-shipping_address_city',
                    'state' => $this->getStateMappings('AU')
                        ? '#order-shipping_address_region_id'
                        : '#order-shipping_address_region',
                    'postcode' => '#order-shipping_address_postcode',
                ],
                'stateMappings' => $this->getStateMappings('AU'),
            ],
        ]));
    }
}
