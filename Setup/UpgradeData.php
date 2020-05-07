<?php

namespace AddressFinder\AddressFinder\Setup;

use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\ModuleDataSetupInterface;
use Magento\Framework\Setup\UpgradeDataInterface;

class UpgradeData implements UpgradeDataInterface
{
    /**
     * {@inheritdoc}
     */
    public function upgrade(ModuleDataSetupInterface $setup, ModuleContextInterface $context)
    {
        $setup->startSetup();

        // Upgrading to 1.1.0
        if (version_compare($context->getVersion(), '1.1.0') < 0) {
            $this->copyConfigValuesFromOldModule($setup);
        }

        $setup->endSetup();
    }

    /**
     * Copies existing config values from the module as it was named previously.
     *
     * Note that this method only takes into account global configuration, not per-store.
     * Per-store overrides will need to be manually re-added via the system config.
     */
    private function copyConfigValuesFromOldModule(ModuleDataSetupInterface $setup)
    {
        // We'll set the enabled flag based on the existence of a license key,
        // which was the assumed behaviour in the template previously.
        $hasLicenseKey = (bool) $setup->getConnection()->fetchOne(
            $setup->getConnection()
                ->select()
                ->from($setup->getTable('core_config_data'), 'value')
                ->where('path = ?', 'AddressFinder_Widget/settings/licence_key')
        );

        if ($hasLicenseKey) {
            $setup->getConnection()->insert(
                $setup->getTable('core_config_data'),
                [
                    'scope' => 'default',
                    'scope_id' => 0,
                    'path' => 'addressfinder/general/enabled',
                    'value' => 1,
                ]
            );
        }

        foreach (['licence_key', 'debug_mode', 'widget_options'] as $option) {
            $setup->getConnection()->update(
                $setup->getTable('core_config_data'),
                ['path' => sprintf('addressfinder/general/%s', $option)],
                ['path = ?' => sprintf('AddressFinder_Widget/settings/%s', $option)]
            );
        }
    }
}
