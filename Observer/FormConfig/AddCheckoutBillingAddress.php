<?php

namespace AddressFinder\AddressFinder\Observer\FormConfig;

use AddressFinder\AddressFinder\Model\StateMappingProvider;
use Magento\Framework\Data\Collection;
use Magento\Framework\DataObject;
use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;
use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\Exception\NoSuchEntityException;
use Magento\Payment\Helper\Data as PaymentHelper;
use Psr\Log\LoggerInterface;

class AddCheckoutBillingAddress implements ObserverInterface
{
    /**
     * @var StateMappingProvider
     */
    private $stateMappingProvider;

    /**
     * @var PaymentHelper
     */
    private $paymentHelper;

    /**
     * @var LoggerInterface
     */
    private $logger;

    /**
     * Creates a new "Add Checkout Billing Address" observer.
     *
     * @param StateMappingProvider $stateMappingProvider
     * @param PaymentHelper $paymentHelper
     */
    public function __construct(
        StateMappingProvider $stateMappingProvider,
        PaymentHelper $paymentHelper,
        LoggerInterface $logger
    ) {
        $this->stateMappingProvider = $stateMappingProvider;
        $this->paymentHelper = $paymentHelper;
        $this->logger = $logger;
    }

    /**
     * {@inheritDoc}
     */
    public function execute(Observer $observer)
    {
        /** @var Collection $forms */
        $forms = $observer->getEvent()->getData('forms');

        foreach ($this->getActivePaymentMethodCodes() as $code) {
            try {
                $forms->addItem(new DataObject([
                    'label' => sprintf('Checkout Billing Address (%s)', $code),
                    'layoutSelectors' => [
                        'li#payment',
                        sprintf('div[name="billingAddress%s.street.0"]', $code)
                    ],
                    'countryIdentifier' => sprintf(
                        'div[name="billingAddress%s.country_id"] select[name=country_id]',
                        $code
                    ),
                    'searchIdentifier' => sprintf(
                        'div[name="billingAddress%s.street.0"] input[name="street[0]"]',
                        $code
                    ),
                    'nz' => [
                        'countryValue' => 'NZ',
                        'elements' => [
                            'address1' => sprintf(
                                'div[name="billingAddress%s.street.0"] input[name="street[0]"]',
                                $code
                            ),
                            'address2' => sprintf(
                                'div[name="billingAddress%s.street.1"] input[name="street[1]"]',
                                $code
                            ),
                            'suburb' => sprintf(
                                'div[name="billingAddress%s.street.2"] input[name="street[2]"]',
                                $code
                            ),
                            'city' => sprintf(
                                'div[name="billingAddress%s.city"] input[name=city]',
                                $code
                            ),
                            'region' => sprintf(
                                'div[name="billingAddress%s.region"] input[name=region]',
                                $code
                            ),
                            'postcode' => sprintf(
                                'div[name="billingAddress%s.postcode"] input[name=postcode]',
                                $code
                            ),
                        ],
                        'regionMappings' => null,
                    ],
                    'au' => [
                        'countryValue' => 'AU',
                        'elements' => [
                            'address1' => sprintf(
                                'div[name="billingAddress%s.street.0"] input[name="street[0]"]',
                                $code
                            ),
                            'address2' => sprintf(
                                'div[name="billingAddress%s.street.1"] input[name="street[1]"]',
                                $code
                            ),
                            'suburb' => sprintf(
                                'div[name="billingAddress%s.street.2"] input[name="street[2]"]',
                                $code
                            ),
                            'state' => sprintf(
                                'div[name="billingAddress%s.region_id"] select[name=region_id]',
                                $code
                            ),
                            'postcode' => sprintf(
                                'div[name="billingAddress%s.postcode"] input[name=postcode]',
                                $code
                            ),
                        ],
                        'stateMappings' => $this->stateMappingProvider->forCountry('AU'),
                    ],
                ]));
            } catch (NoSuchEntityException $e) {
                $this->logger->error(sprintf('Could not fetch state mappings: %s.', $e->getMessage()));
            }
        }
    }

    /**
     * Gets active payment method codes.
     *
     * @return string[]
     */
    private function getActivePaymentMethodCodes()
    {
        $codes = [];

        foreach ($this->paymentHelper->getStoreMethods() as $method) {
            try {
                $codes[] = $method->getCode();
            } catch (LocalizedException $e) {
            }
        }

        return $codes;
    }
}