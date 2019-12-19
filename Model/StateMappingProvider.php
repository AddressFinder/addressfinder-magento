<?php

namespace AddressFinder\AddressFinder\Model;

use AddressFinder\AddressFinder\Exception\NoStateMappingsException;
use Magento\Directory\Api\CountryInformationAcquirerInterface;
use Magento\Framework\Exception\NoSuchEntityException;

class StateMappingProvider
{
    /**
     * @var CountryInformationAcquirerInterface
     */
    private $countryInformationAcquirer;

    /**
     * Array of cached mappings per-country.
     */
    private $mappings = [];

    /**
     * StateMappingProvider constructor.
     *
     * @param CountryInformationAcquirerInterface $countryInformationAcquirer
     */
    public function __construct(CountryInformationAcquirerInterface $countryInformationAcquirer)
    {
        $this->countryInformationAcquirer = $countryInformationAcquirer;
    }

    /**
     * Gets state mappings for the given country code.
     *
     * @param string $countryCode Two-digit country code.
     *
     * @return array
     * @throws NoSuchEntityException    When the country code does not exist
     * @throws NoStateMappingsException When there are no state mappings for the country code
     */
    public function forCountry($countryCode)
    {
        if (!array_key_exists($countryCode, $this->mappings)) {
            $country = $this->countryInformationAcquirer->getCountryInfo($countryCode);

            $regions = $country->getAvailableRegions();

            if (!is_array($regions)) {
                throw NoStateMappingsException::forCountry($countryCode);
            }

            $this->mappings[$countryCode] = [];

            foreach ($regions as $region) {
                $this->mappings[$countryCode][$region->getCode()] = $region->getId();
            }
        }

        return $this->mappings[$countryCode];
    }
}