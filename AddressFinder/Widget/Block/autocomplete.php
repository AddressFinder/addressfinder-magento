<?php
/**
* @category  AddressFinder
* @package   AddressFinder_Widget
* @author    AddressFinder
* @copyright Copyright (c) 2018 AddressFinder Limited
*/
namespace AddressFinder\Widget\Block;

use Magento\Framework\View\Element\Template\Context;

class Autocomplete extends \Magento\Framework\View\Element\Template
{

  /**
  * @param Context $context,
  * @param array   $data = []
  */
  public function __construct(
    Context $context,
    array $data = []
  ) {
    parent::__construct($context, $data);
  }

  /**
  * Gets the config from the settings screen.
  */
  public function getConfig()
  {
    $this->scopeConfig->getValue("AddressFinder_Widget/settings/" . $field, \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
  }
}
