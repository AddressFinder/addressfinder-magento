<?php

namespace AddressFinder\Widget\Helper;

class Data extends \Magento\Framework\App\Helper\AbstractHelper
{
    private $storeManager;
    private $objectManager;
    private $encryptor;

    public function __construct(
        \Magento\Framework\App\Helper\Context $context,
        \Magento\Framework\ObjectManagerInterface $objectManager,
        \Magento\Store\Model\StoreManagerInterface $storeManager,
        \Magento\Framework\Encryption\EncryptorInterface $encryptor
    ) {
        $this->objectManager = $objectManager;
        $this->storeManager  = $storeManager;
        $this->encryptor = $encryptor;
        parent::__construct($context);
    }

    public function getEncryptedConfig($field)
    {
        $value = $this->getConfig($field);
        return $this->encryptor->decrypt($value);
    }

    public function getConfig($field)
    {
        $value = $this->scopeConfig->getValue("AddressFinder_Widget/settings/" . $field, \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
        return $value;
    }
}
