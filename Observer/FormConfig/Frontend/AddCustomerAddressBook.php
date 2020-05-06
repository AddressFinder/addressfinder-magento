<?php

namespace AddressFinder\AddressFinder\Observer\FormConfig\Frontend;

use AddressFinder\AddressFinder\Exception\NoStateMappingsException;
use AddressFinder\AddressFinder\Model\FormConfigProvider;
use AddressFinder\AddressFinder\Model\StateMappingProvider;
use Magento\Framework\Data\Collection;
use Magento\Framework\DataObject;
use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;
use Magento\Framework\Exception\NoSuchEntityException;
use Psr\Log\LoggerInterface;

class AddCustomerAddressBook implements ObserverInterface
{
    const FORM_ID = 'frontend.customer.address.book';

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
     * Creates a new "Add Customer Address Book" observer.
     *
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

        if (FormConfigProvider::AREA_FRONTEND !== $area || !$this->configProvider->isFormEnabled(self::FORM_ID)) {
            return;
        }

        /** @var Collection $forms */
        $forms = $observer->getEvent()->getData('forms');

        try {
            $stateMappings = $this->stateMappingProvider->forCountry('AU');
        } catch (NoSuchEntityException $e) {
            $this->logger->error(sprintf(
                'Could not attach customer address book: %s.',
                $e->getMessage())
            );
            return;
        } catch (NoStateMappingsException $e) {
            $stateMappings = null;
        }

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
                    'state' => $stateMappings
                        ? 'select[name=region_id]'
                        : 'input[name=region]',
                    'postcode' => 'input[name=postcode]',
                ],
                'stateMappings' => $stateMappings,
            ],
        ]));
    }
}