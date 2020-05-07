<?php

namespace AddressFinder\AddressFinder\Observer\FormConfig\Frontend;

use AddressFinder\AddressFinder\Observer\FormConfig\Base;
use Exception;
use Magento\Framework\Data\Collection;
use Magento\Framework\DataObject;

class AddCustomerAddressBook extends Base
{
    const FORM_ID = 'frontend.customer.address.book';

    /**
     * @inheritDoc
     *
     * @throws Exception
     */
    protected function addForm(Collection $forms)
    {
        $forms->addItem(new DataObject([
            'id' => self::FORM_ID,
            'label' => 'Customer Address Book',
            'layoutSelectors' => ['input#street_1'],
            'countryIdentifier' => 'select[name=country_id]',
            'searchIdentifier' => 'input#street_1',
            'nz' => [
                'countryValue' => 'NZ',
                'elements' => [
                    'address1' => 'input#street_1',
                    'suburb' => 'input#street_2',
                    'city' => 'input[name=city]',
                    'region' => 'input[name=region]',
                    'postcode' => 'input[name=postcode]',
                ],
                'regionMappings' => null,
            ],
            'au' => [
                'countryValue' => 'AU',
                'elements' => [
                    'address1' => 'input#street_1',
                    'address2' => 'input#street_2',
                    'suburb' => 'input[name=city]',
                    'state' => $this->getStateMappings('AU')
                        ? 'select[name=region_id]'
                        : 'input[name=region]',
                    'postcode' => 'input[name=postcode]',
                ],
                'stateMappings' => $this->getStateMappings('AU'),
            ],
        ]));
    }
}