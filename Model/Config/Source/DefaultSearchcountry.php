<?php

namespace AddressFinder\AddressFinder\Model\Config\Source;

class DefaultSearchcountry implements \Magento\Framework\Data\OptionSourceInterface
{
    /**
     * Return array of options as value-label pairs, eg. value => label
     *
     * @return array
     */
    public function toOptionArray()
    {
        return [
            'nz' => 'New Zealand',
            'au' => 'Australia',
        ];
    }
}