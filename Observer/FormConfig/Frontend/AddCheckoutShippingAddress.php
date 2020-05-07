<?php

namespace AddressFinder\AddressFinder\Observer\FormConfig\Frontend;

use AddressFinder\AddressFinder\Observer\FormConfig\Base;
use Exception;
use Magento\Framework\Data\Collection;
use Magento\Framework\DataObject;

class AddCheckoutShippingAddress extends Base
{
    const FORM_ID = 'frontend.checkout.shipping.address';

    /**
     * @inheritDoc
     *
     * @throws Exception
     */
    protected function addForm(Collection $forms)
    {
        $forms->addItem(new DataObject([
            'id' => self::FORM_ID,
            'label' => 'Checkout Shipping Address',
            'layoutSelectors' => ['li#opc-shipping_method'],
            'countryIdentifier' => '.form-shipping-address select[name=country_id]',
            'searchIdentifier' => '.form-shipping-address input[name="street[0]"]',
            'nz' => [
                'countryValue' => 'NZ',
                'elements' => [
                    'address1' => '.form-shipping-address input[name="street[0]"]',
                    'address2' => '.form-shipping-address input[name="street[1]"]',
                    'suburb' => '.form-shipping-address input[name="street[2]"]',
                    'city' => '.form-shipping-address input[name=city]',
                    'region' => '.form-shipping-address input[name=region]',
                    'postcode' => '.form-shipping-address input[name=postcode]',
                ],
                'regionMappings' => null,
            ],
            'au' => [
                'countryValue' => 'AU',
                'elements' => [
                    'address1' => '.form-shipping-address input[name="street[0]"]',
                    'address2' => '.form-shipping-address input[name="street[1]"]',
                    'suburb' => '.form-shipping-address input[name="city"]',
                    'state' => $this->getStateMappings('AU')
                        ? '.form-shipping-address select[name=region_id]'
                        : '.form-shipping-address input[name=region]',
                    'postcode' => '.form-shipping-address input[name=postcode]',
                ],
                'stateMappings' => $this->getStateMappings('AU'),
            ],
        ]));
    }
}