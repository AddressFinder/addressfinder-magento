<?php

namespace AddressFinder\AddressFinder\Observer\FormConfig;

use AddressFinder\AddressFinder\Model\StateMappingProvider;
use Magento\Framework\Data\Collection;
use Magento\Framework\DataObject;
use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;
use Magento\Framework\Exception\NoSuchEntityException;

class AddCheckoutBillingAddress implements ObserverInterface
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
            'label' => 'Checkout Billing Address',
            'layoutSelectors' => ['li#payment'],
            'countryIdentifier' => '.billing-address-form select[name=country_id]',
            'searchIdentifier' => '.billing-address-form input[name="street[0]"]',
            'nz' => [
                'countryValue' => 'NZ',
                'elements' => [
                    'address1' => '.billing-address-form input[name="street[0]"]',
                    'address2' => '.billing-address-form input[name="street[1]"]',
                    'suburb' => '.billing-address-form input[name="street[2]"]',
                    'city' => '.billing-address-form input[name=city]',
                    'region' => '.billing-address-form input[name=region]',
                    'postcode' => '.billing-address-form input[name=postcode]',
                ],
                'regionMappings' => null,
            ],
            'au' => [
                'countryValue' => 'AU',
                'elements' => [
                    'address1' => '.billing-address-form input[name="street[0]"]',
                    'address2' => '.billing-address-form input[name="street[1]"]',
                    'suburb' => '.billing-address-form input[name="street[2]"]',
                    'city' => '.billing-address-form input[name=city]',
                    'state' => '.billing-address-form select[name=region_id]',
                    'postcode' => '.billing-address-form input[name=postcode]',
                ],
                'stateMappings' => $this->stateMappingProvider->forCountry('AU'),
            ],
        ]));
    }
}