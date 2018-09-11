<?php

namespace AddressFinder\AddressFinder\Block;

class Customer extends AbstractBlock
{
    /**
     * {@inheritdoc}
     */
    protected function _prepareLayout()
    {
        if (!$this->getTemplate()) {
            $this->setTemplate('customer.phtml');
        }

        return parent::_prepareLayout();
    }
}
