<?php

namespace AddressFinder\AddressFinder\Model\Config\Source;

use Magento\Framework\Data\Collection;
use Magento\Framework\Data\CollectionFactory;
use Magento\Framework\Data\OptionSourceInterface;
use Magento\Framework\Event\ManagerInterface;

class FormsEnabled implements OptionSourceInterface
{
    /**
     * A constant that represents all forms being enabled.
     */
    const ALL = 'all';

    /**
     * @var CollectionFactory
     */
    private $collectionFactory;

    /**
     * @var ManagerInterface
     */
    private $events;

    /**
     * Creates a new "forms enabled" config source.
     */
    public function __construct(CollectionFactory $collectionFactory, ManagerInterface $events)
    {
        $this->collectionFactory = $collectionFactory;
        $this->events = $events;
    }

    /**
     * Return array of options as value-label pairs, eg. value => label
     *
     * @return array
     */
    public function toOptionArray()
    {
        /** @var Collection $frontend */
        $frontend = $this->collectionFactory->create();

        /** @var Collection $adminhtml */
        $adminhtml = $this->collectionFactory->create();

        $this->events->dispatch('addressfinder_config_source_forms_enabled', [
            'frontend' => $frontend,
            'adminhtml' => $adminhtml,
        ]);

        $options = [
            [
                'label' => __('All'),
                'value' => self::ALL,
            ],
            [
                'label' => 'Frontend',
                'value' => $frontend->toArray()['items'],
            ],
            [
                'label' => 'Admin',
                'value' => $adminhtml->toArray()['items'],
            ],
        ];

        foreach ($options as $index => $group) {
            if (empty($group['value'])) {
                array_splice($options, $index, 1);
            }
        }

        return $options;
    }
}