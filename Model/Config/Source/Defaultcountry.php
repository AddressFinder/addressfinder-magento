<?php

namespace AddressFinder\AddressFinder\Model\Config\Source;

class Defaultcountry implements \Magento\Framework\Data\OptionSourceInterface
{
    /**
     * Return array of options as value-label pairs, eg. value => label
     *
     * @return array
     */
    public function toOptionArray()
    {
        return [
            'NZ' => 'New Zealand',
            'AU' => 'Australia',
        ];
    }
}