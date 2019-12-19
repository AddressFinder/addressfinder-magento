<?php

namespace AddressFinder\AddressFinder\Observer\FormConfig;

use AddressFinder\AddressFinder\Exception\NoStateMappingsException;
use AddressFinder\AddressFinder\Model\StateMappingProvider;
use Magento\Framework\Data\Collection;
use Magento\Framework\DataObject;
use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;
use Magento\Framework\Exception\NoSuchEntityException;
use Psr\Log\LoggerInterface;

class AddCheckoutShippingAddress implements ObserverInterface
{
    /**
     * @var StateMappingProvider
     */
    private $stateMappingProvider;

    /**
     * @var LoggerInterface
     */
    private $logger;

    /**
     * Creates a new "Add Checkout Shipping Address" observer.
     *
     * @param StateMappingProvider $stateMappingProvider
     */
    public function __construct(StateMappingProvider $stateMappingProvider, LoggerInterface $logger)
    {
        $this->stateMappingProvider = $stateMappingProvider;
        $this->logger               = $logger;
    }

    /**
     * {@inheritDoc}
     */
    public function execute(Observer $observer)
    {
        /** @var Collection $forms */
        $forms = $observer->getEvent()->getData('forms');

        try {
            $stateMappings = $this->stateMappingProvider->forCountry('AU');
        } catch (NoSuchEntityException $e) {
            $this->logger->error(sprintf(
                    'Could not attach checkout shipping address: %s.',
                    $e->getMessage())
            );

            return;
        } catch (NoStateMappingsException $e) {
            $stateMappings = null;
        }

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
                    'suburb' => '.form-shipping-address input[name="city"]',
                    'state' => $stateMappings
                        ? '.form-shipping-address select[name=region_id]'
                        : '.form-shipping-address input[name=region]',
                    'postcode' => '.form-shipping-address input[name=postcode]',
                ],
                'stateMappings' => $stateMappings,
            ],
        ]));
    }
}