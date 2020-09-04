<?php

namespace AddressFinder\AddressFinder\Observer\FormConfig;

use AddressFinder\AddressFinder\Exception\NoStateMappingsException;
use AddressFinder\AddressFinder\Model\FormConfigProvider;
use AddressFinder\AddressFinder\Model\StateMappingProvider;
use LogicException;
use Magento\Directory\Api\CountryInformationAcquirerInterface;
use Magento\Framework\Data\Collection;
use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;
use Magento\Framework\Exception\NoSuchEntityException;

abstract class Base implements ObserverInterface
{
    /**
     * A unique identifier for the form.
     */
    public const FORM_ID = null;

    /** @var FormConfigProvider */
    private $configProvider;

    /** @var StateMappingProvider */
    private $stateMappingProvider;

    public function __construct(
        FormConfigProvider $configProvider,
        StateMappingProvider $stateMappingProvider
    ) {
        $this->configProvider = $configProvider;
        $this->stateMappingProvider = $stateMappingProvider;

        if (!static::FORM_ID) {
            throw new LogicException('You must configure the form ID and it must be unique from all other forms.');
        }
    }

    /**
     * {@inheritDoc}
     */
    public function execute(Observer $observer): void
    {
        if (!$this->shouldShow()) {
            return;
        }

        /** @var Collection $forms */
        $forms = $observer->getEvent()->getData('forms');

        $this->addForm($forms);
    }

    /**
     * Adds the form to the new forms collection.
     */
    abstract protected function addForm(Collection $forms): void;

    /**
     * Tells if the form should show or not.
     */
    protected function shouldShow(): bool
    {
        return $this->configProvider->isFormEnabled(static::FORM_ID);
    }

    /**
     * Fetches state mappings for the given country code. If the country is disabled/not installed, or
     * there are no states installed for that country (e.g. NZ), we'll return null instead.
     *
     * @see CountryInformationAcquirerInterface::getCountryInfo()
     */
    protected function getStateMappings(string $countryCode): ?array
    {
        try {
            return $this->stateMappingProvider->forCountry($countryCode);
        } catch (NoSuchEntityException $e) {
            // The country is disabled/not installed
        } catch (NoStateMappingsException $e) {
            // There are no states for the country
        }

        return null;
    }
}
