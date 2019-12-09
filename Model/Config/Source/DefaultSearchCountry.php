<?php

namespace AddressFinder\AddressFinder\Model\Config\Source;

use Magento\Directory\Api\CountryInformationAcquirerInterface;
use Magento\Framework\Data\OptionSourceInterface;
use Magento\Framework\Exception\NoSuchEntityException;

class DefaultSearchCountry implements OptionSourceInterface
{
    /**
     * @var CountryInformationAcquirerInterface
     */
    private $countryInformationAcquirer;

    public function __construct(CountryInformationAcquirerInterface $countryInformationAcquirer)
    {
        $this->countryInformationAcquirer = $countryInformationAcquirer;
    }

    /**
     * Return array of options as value-label pairs, eg. value => label
     *
     * @return array
     */
    public function toOptionArray()
    {
        $options = [];

        foreach (['AU', 'NZ'] as $code) {
            try {
                $info = $this->countryInformationAcquirer->getCountryInfo($code);
            } catch (NoSuchEntityException $e) {
                continue;
            }

            $options[] = [
                'value' => strtolower($code),
                'label' => $info->getFullNameLocale(),
            ];
        }

        return $options;
    }
}