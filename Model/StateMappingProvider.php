<?php


namespace AddressFinder\AddressFinder\Model;


use Magento\Directory\Api\CountryInformationAcquirerInterface;
use Magento\Framework\Exception\NoSuchEntityException;

class StateMappingProvider
{
    /**
     * @var CountryInformationAcquirerInterface
     */
    private $countryInformationAcquirer;

    /**
     * StateMappingProvider constructor.
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
     * @return array
     * @throws NoSuchEntityException
     */
    public function forCountry(string $countryCode)
    {
        $country = $this->countryInformationAcquirer->getCountryInfo($countryCode);

        $mappings = [];

        foreach ($country->getAvailableRegions() as $region) {
            $mappings[$region->getCode()] = $region->getId();
        }

        return $mappings;
    }
}