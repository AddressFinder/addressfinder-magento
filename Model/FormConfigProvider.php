<?php

namespace AddressFinder\AddressFinder\Model;

use AddressFinder\AddressFinder\Model\Config\Source\FormsEnabled;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\Json\DecoderInterface;
use Magento\Store\Model\ScopeInterface;

class FormConfigProvider
{
    const AREA_ADMIN = 'admin';
    const AREA_FRONTEND = 'frontend';

    /**
     * @var ScopeConfigInterface
     */
    private $scopeConfig;

    /**
     * Creates a new form config provider.
     */
    public function __construct(ScopeConfigInterface $scopeConfig)
    {
        $this->scopeConfig = $scopeConfig;
    }

    /**
     * Tells if the given form is enabled or not based on user configuration.
     *
     * @param string $form
     * @return boolTe
     */
    public function isFormEnabled(string $form): bool
    {
        $config = $this->getConfigValue();

        if (FormsEnabled::ALL === $config) {
            return true;
        }

        return in_array($form, $config, true);
    }

    /**
     * Gets the configured value, which is either an array of form IDs or a string:
     *
     *   FormsEnabled::ALL
     *
     * @return array|string
     *
     * @see FormsEnabled::toOptionArray()
     */
    private function getConfigValue()
    {
        /** @var string|null $forms */
        $forms = $this->scopeConfig->getValue('addressfinder/general/forms_enabled', ScopeInterface::SCOPE_STORE);

        if (empty($forms)) {
            return FormsEnabled::ALL;
        }

        $forms = array_map('trim', explode(',', $forms));

        if (in_array(FormsEnabled::ALL, $forms, true)) {
            return FormsEnabled::ALL;
        }

        return $forms;
    }
}