<?php

namespace AddressFinder\AddressFinder\Observer\FormConfig\Adminhtml;

use AddressFinder\AddressFinder\Exception\NoStateMappingsException;
use AddressFinder\AddressFinder\Model\FormConfigProvider;
use AddressFinder\AddressFinder\Model\StateMappingProvider;
use Magento\Framework\Data\Collection;
use Magento\Framework\DataObject;
use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;
use Magento\Framework\Exception\NoSuchEntityException;
use Psr\Log\LoggerInterface;

class AddOrderBillingAddress implements ObserverInterface
{
    const FORM_ID = 'admin.order.billing.address';

    /**
     * @var FormConfigProvider
     */
    private $configProvider;

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
     * @param FormConfigProvider   $configProvider
     * @param StateMappingProvider $stateMappingProvider
     */
    public function __construct(
        FormConfigProvider $configProvider,
        StateMappingProvider $stateMappingProvider,
        LoggerInterface $logger
    ) {
        $this->configProvider       = $configProvider;
        $this->stateMappingProvider = $stateMappingProvider;
        $this->logger               = $logger;
    }

    /**
     * {@inheritDoc}
     */
    public function execute(Observer $observer)
    {
        /** @var string $area */
        $area = $observer->getEvent()->getData('area');

        if (FormConfigProvider::AREA_ADMIN !== $area || !$this->configProvider->isFormEnabled(self::FORM_ID)) {
            return;
        }

        /** @var Collection $forms */
        $forms = $observer->getEvent()->getData('forms');

        try {
            $stateMappings = $this->stateMappingProvider->forCountry('AU');
        } catch (NoSuchEntityException $e) {
            $this->logger->error(sprintf(
                    'Could not attach order billing address: %s.',
                    $e->getMessage())
            );

            return;
        } catch (NoStateMappingsException $e) {
            $stateMappings = null;
        }

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
                    'suburb' => '.form-shipping-address input[name="street[2]"]',
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
                    'state' => $stateMappings
                        ? '#order-billing_address_region_id'
                        : '#order-billing_address_region',
                    'postcode' => '#order-billing_address_postcode',
                ],
                'stateMappings' => $stateMappings,
            ],
        ]));
    }
}