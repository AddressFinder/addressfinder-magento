<?php
  namespace AddressFinder\Widget\Controller\Adminhtml\Settings;

  class Index extends \Magento\Backend\App\Action
  {
    /**
    * @var \Magento\Framework\View\Result\PageFactory
    */
    protected $resultPageFactory;

    /**
     * Constructor
     *
     * @param \Magento\Backend\App\Action\Context $context
     * @param \Magento\Framework\View\Result\PageFactory $resultPageFactory
     */
    public function __construct(
      \Magento\Backend\App\Action\Context $context,
      \Magento\Framework\View\Result\PageFactory $resultPageFactory
    ) {
      parent::__construct($context);
      $this->resultPageFactory = $resultPageFactory;
    }

    /**
     * Load the page defined in view/adminhtml/layout/addressfinder_settings_index.xml
     *
     * @return \Magento\Framework\View\Result\Page
     */
    public function execute()
    {
      $post = $this->getRequest()->getPost();
      if ($post) {

        // Retrieve your form data
        $auLicenceKey = $post['au_licence_key'];
        $nzLicenceKey = $post['nz_licence_key'];

        // $email = $this->getRequest()->getParam('email_address');

        $settings = $this->settingsDataFactory->create();

        try {
          $settingsData = $settings->load(1);
          $settingsData->setAuLicenceKey($auLicenceKey);
          $settingsData->setNzLicenceKey($nzLicenceKey);
          $settingsData->save();
        } catch(\Exception $ex) {
          var_dump($ex.getMessage);
        }

        // Display the succes form validation message
        $this->messageManager->addSuccess('Settings saved!');

        // // Redirect to your form page (or anywhere you want...)
        // $resultRedirect = $this->resultFactory->create(ResultFactory::TYPE_REDIRECT);
        // $resultRedirect->setUrl('/compagny/module/contact');
        //
        // return $resultRedirect;
      }
      // Render the page
      // $this->_view->loadLayout();
      // $this->_view->renderLayout();

      return  $resultPage = $this->resultPageFactory->create();
    }
  }
?>
