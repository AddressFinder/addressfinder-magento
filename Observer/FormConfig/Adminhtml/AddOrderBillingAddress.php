<?php

namespace AddressFinder\AddressFinder\Observer\FormConfig\Adminhtml;

use AddressFinder\AddressFinder\Model\FormConfigProvider;
use AddressFinder\AddressFinder\Observer\FormConfig\Base;
use Exception;
use Magento\Framework\App\ProductMetadataInterface;
use Magento\Framework\Data\Collection;
use Magento\Framework\DataObject;

class AddOrderBillingAddress extends Base
{
    const FORM_ID = 'admin.order.billing.address';

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
            'label' => 'Order Billing Address',
            'layoutSelectors' => ['#order-billing_address_fields'],
            'countryIdentifier' => '#order-billing_address_country_id',
            'searchIdentifier' => '#order-billing_address_street0',
            'nz' => [
                'countryValue' => 'NZ',
                'elements' => [
                    'address1' => '#order-billing_address_street0',
                    'address2' => '#order-billing_address_street1',
                    'suburb' => '#order-billing_address_street2',
                    'city' => '#order-billing_address_city',
                    'region' => '#order-billing_address_region',
                    'postcode' => '#order-billing_address_postcode',
                ],
                'regionMappings' => null,
            ],
            'au' => [
                'countryValue' => 'AU',
                'elements' => [
                    'address1' => '#order-billing_address_street0',
                    'address2' => '#order-billing_address_street1',
                    'suburb' => '#order-billing_address_city',
                    'state' => $this->getStateMappings('AU')
                        ? '#order-billing_address_region_id'
                        : '#order-billing_address_region',
                    'postcode' => '#order-billing_address_postcode',
                ],
                'stateMappings' => $this->getStateMappings('AU'),
            ],
        ]));
    }
}
