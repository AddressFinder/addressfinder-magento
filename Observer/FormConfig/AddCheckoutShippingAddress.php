<?php

namespace AddressFinder\AddressFinder\Observer\FormConfig;

use AddressFinder\AddressFinder\Model\StateMappingProvider;
use Magento\Framework\Data\Collection;
use Magento\Framework\DataObject;
use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;
use Magento\Framework\Exception\NoSuchEntityException;

class AddCheckoutShippingAddress implements ObserverInterface
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
                    'suburb' => '.form-shipping-address input[name="street[2]"]',
                    'city' => '.form-shipping-address input[name=city]',
                    'state' => '.form-shipping-address select[name=region_id]',
                    'postcode' => '.form-shipping-address input[name=postcode]',
                ],
                'stateMappings' => $this->stateMappingProvider->forCountry('AU'),
            ],
        ]));
    }
}