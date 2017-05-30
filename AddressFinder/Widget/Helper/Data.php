<?php

namespace AddressFinder\Widget\Helper;

class Data extends \Magento\Framework\App\Helper\AbstractHelper
{
  protected $storeManager;
  protected $objectManager;
  protected $encryptor;

  public function __construct(\Magento\Framework\App\Helper\Context $context,
      \Magento\Framework\ObjectManagerInterface $objectManager,
      \Magento\Store\Model\StoreManagerInterface $storeManager,
      \Magento\Framework\Encryption\EncryptorInterface $encryptor
  ) {
      $this->objectManager = $objectManager;
      $this->storeManager  = $storeManager;
      $this->encryptor = $encryptor;
      parent::__construct($context);
  }

  public function getConfig($field)
  {
    $value = $this->scopeConfig->getValue("AddressFinder_Widget/settings/" . $field, \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
    return $this->encryptor->decrypt($value);
  }
}