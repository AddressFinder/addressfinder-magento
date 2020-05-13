<?php

namespace AddressFinder\AddressFinder\Observer\FormConfig\Frontend;

use AddressFinder\AddressFinder\Model\FormConfigProvider;
use AddressFinder\AddressFinder\Model\StateMappingProvider;
use AddressFinder\AddressFinder\Observer\FormConfig\Base;
use Exception;
use Magento\Framework\Data\Collection;
use Magento\Framework\DataObject;
use Magento\Framework\Exception\LocalizedException;
use Magento\Payment\Helper\Data as PaymentHelper;

class AddCheckoutBillingAddress extends Base
{
    const FORM_ID = 'frontend.checkout.billing.address';

    /**
     * @var PaymentHelper
     */
    private $paymentHelper;

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
        PaymentHelper $paymentHelper
    ) {
        parent::__construct($configProvider, $stateMappingProvider);

        $this->paymentHelper = $paymentHelper;
    }

    /**
     * @inheritDoc
     *
     * @throws Exception
     */
    protected function addForm(Collection $forms)
    {
        foreach ($this->getActivePaymentMethodCodes() as $code) {
            $forms->addItem(new DataObject([
                'id' => sprintf('%s.%s', self::FORM_ID, $code),
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
                        'state' => $this->getStateMappings('AU')
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
                    'stateMappings' => $this->getStateMappings('AU'),
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
