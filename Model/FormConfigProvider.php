<?php

namespace AddressFinder\AddressFinder\Model;

use AddressFinder\AddressFinder\Model\Config\Source\FormsEnabled;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\Data\Collection;
use Magento\Framework\Data\CollectionFactory;
use Magento\Framework\Event\ManagerInterface;
use Magento\Store\Model\ScopeInterface;
use Psr\Log\LoggerInterface;

class FormConfigProvider
{
    /**
     * @var ScopeConfigInterface
     */
    private $scopeConfig;

    /**
     * @var ManagerInterface
     */
    private $events;

    /**
     * @var CollectionFactory
     */
    private $collectionFactory;

    /**
     * @var LoggerInterface
     */
    private $logger;

    /**
     * Form config cache, where each key is the event name used to build the config.
     */
    private $formsConfig = [];

    /**
     * Creates a new form config provider.
     */
    public function __construct(
        ScopeConfigInterface $scopeConfig,
        ManagerInterface $events,
        CollectionFactory $collectionFactory,
        LoggerInterface $logger
    ) {
        $this->scopeConfig = $scopeConfig;
        $this->events = $events;
        $this->collectionFactory = $collectionFactory;
        $this->logger = $logger;
    }

    /**
     * Tells if the given form is enabled or not based on user configuration.
     *
     * @param string $form
     *
     * @return bool
     */
    public function isFormEnabled($form)
    {
        $config = $this->getConfigValue();

        if (FormsEnabled::ALL === $config) {
            return true;
        }

        return in_array($form, $config, true);
    }

    /**
     * Gets form config by firing the given event name and returning
     * the collection of forms built by observers.
     *
     * @param string $eventName
     *
     * @return Collection
     */
    public function get($eventName)
    {
        if (!array_key_exists($eventName, $this->formsConfig)) {

            /** @var Collection $formsConfig */
            $formsConfig = $this->collectionFactory->create();

            $this->events->dispatch(
                $eventName,
                [
                    'forms' => $formsConfig,
                ]
            );

            if (0 === $formsConfig->count()) {
                $this->logger->warning(sprintf(
                    'There are no configured forms for AddressFinder for the "%s" event.',
                    $eventName
                ));
            }

            $this->formsConfig[$eventName] = $formsConfig;
        }

        return $this->formsConfig[$eventName];
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

        /** @var array $forms */

        if (in_array(FormsEnabled::ALL, $forms, true)) {
            return FormsEnabled::ALL;
        }

        return $forms;
    }
}