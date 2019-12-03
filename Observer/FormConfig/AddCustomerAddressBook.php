<?php

namespace AddressFinder\AddressFinder\Observer\FormConfig;

use AddressFinder\AddressFinder\Model\StateMappingProvider;
use Magento\Framework\Data\Collection;
use Magento\Framework\DataObject;
use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;
use Magento\Framework\Exception\NoSuchEntityException;

class AddCustomerAddressBook implements ObserverInterface
{
    /**
     * @var StateMappingProvider
     */
    private $stateMappingProvider;

    /**
     * Creates a new "Checkout Billing Address" observer.
     */
    public function __construct(StateMappingProvider $stateMappingProvider)
    {
        $this->stateMappingProvider = $stateMappingProvider;
    }

    /**
     * {@inheritDoc}
     * @throws NoSuchEntityException
     */
    public function execute(Observer $observer)
    {
        /** @var Collection $forms */
        $forms = $observer->getEvent()->getData('forms');

        $forms->addItem(new DataObject([
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
                    'state' => 'select[name=region_id]',
                    'postcode' => 'input[name=postcode]',
                ],
                'stateMappings' => $this->stateMappingProvider->forCountry('AU'),
            ],
        ]));
    }
}