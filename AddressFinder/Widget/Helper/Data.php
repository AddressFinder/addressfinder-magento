// <?php
//
// namespace AddressFinder\Widget\Helper;
//
// class Data extends \Magento\Framework\App\Helper\AbstractHelper
// {
//     private $storeManager;
//     private $objectManager;
//
//     public function __construct(
//         \Magento\Framework\App\Helper\Context $context,
//         \Magento\Framework\ObjectManagerInterface $objectManager,
//         \Magento\Store\Model\StoreManagerInterface $storeManager
//     ) {
//         $this->objectManager = $objectManager;
//         $this->storeManager  = $storeManager;
//         parent::__construct($context);
//     }
//
//     public function getConfig($field)
//     {
//         $value = $this->scopeConfig->getValue("AddressFinder_Widget/settings/" . $field, \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
//         return $value;
//     }
// }
