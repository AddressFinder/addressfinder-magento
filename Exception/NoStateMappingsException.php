<?php

namespace AddressFinder\AddressFinder\Exception;

use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\Phrase;

class NoStateMappingsException extends LocalizedException
{
    /**
     * Creates a new "no state mappings" exception with the given country code.
     */
    public static function forCountry(string $countryCode): self
    {
        return new static(
            new Phrase(
                'No state mappings for "%countryCode"',
                [
                    'countryCode' => $countryCode,
                ]
            )
        );
    }
}
