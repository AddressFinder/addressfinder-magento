<?php

namespace AddressFinder\AddressFinder\Observer\FormConfig\Frontend;

use AddressFinder\AddressFinder\Exception\NoStateMappingsException;
use AddressFinder\AddressFinder\Model\FormConfigProvider;
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
    const FORM_ID = 'frontend.checkout.billing.address';

    /**
     * @var FormConfigProvider
     */
    private $configProvider;

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
     * @param FormConfigProvider   $configProvider
     * @param StateMappingProvider $stateMappingProvider
     * @param PaymentHelper        $paymentHelper
     */
    public function __construct(
        FormConfigProvider $configProvider,
        StateMappingProvider $stateMappingProvider,
        PaymentHelper $paymentHelper,
        LoggerInterface $logger
    ) {
        $this->configProvider       = $configProvider;
        $this->stateMappingProvider = $stateMappingProvider;
        $this->paymentHelper        = $paymentHelper;
        $this->logger               = $logger;
    }

    /**
     * {@inheritDoc}
     */
    public function execute(Observer $observer)
    {
        /** @var string $area */
        $area = $observer->getEvent()->getData('area');

        if (FormConfigProvider::AREA_FRONTEND !== $area || !$this->configProvider->isFormEnabled(self::FORM_ID)) {
            return;
        }

        /** @var Collection $forms */
        $forms = $observer->getEvent()->getData('forms');

        try {
            $stateMappings = $this->stateMappingProvider->forCountry('AU');
        } catch (NoSuchEntityException $e) {
            $this->logger->error(sprintf(
                'Could not attach checkout billing address: %s.',
                $e->getMessage()
            ));

            return;
        } catch (NoStateMappingsException $e) {
            $stateMappings = null;
        }

        foreach ($this->getActivePaymentMethodCodes() as $code) {
            $forms->addItem(new DataObject([
                'id' => self::FORM_ID,
                'label' => sprintf('Checkout Billing Address (%s)', $code),
                'layoutSelectors' => [
                    'li#payment',
                    sprintf('div[name="billingAddress%s.street.0"]', $code),
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
                            'div[name="billingAddress%s.city"] input[name=city]',
                            $code
                        ),
                        'state' => $stateMappings
                            ? sprintf(
                                'div[name="billingAddress%s.region_id"] select[name=region_id]',
                                $code
                            )
                            : sprintf(
                                'div[name="billingAddress%s.region"] input[name=region]',
                                $code
                            ),
                        'postcode' => sprintf(
                            'div[name="billingAddress%s.postcode"] input[name=postcode]',
                            $code
                        ),
                    ],
                    'stateMappings' => $stateMappings,
                ],
            ]));
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