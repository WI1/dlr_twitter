<?php

function twitter_views_default_views() {
  $view = new view;
  $view->name = 'tweets';
  $view->description = 'Displays Twitter.com status messages for users who have associated Twitter accounts.';
  $view->tag = '';
  $view->base_table = 'twitter';
  $view->core = 0;
  $view->api_version = '2';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */
  $handler = $view->new_display('default', 'Tweets', 'default');
  $handler->override_option('fields', array(
    'profile_image_url' => array(
      'label' => '',
      'exclude' => 0,
      'id' => 'profile_image_url',
      'table' => 'twitter_account',
      'field' => 'profile_image_url',
      'relationship' => 'none',
    ),
    'text' => array(
      'label' => '',
      'alter' => array(
        'alter_text' => 0,
        'text' => '',
        'make_link' => 0,
        'path' => '',
        'absolute' => 0,
        'link_class' => '',
        'alt' => '',
        'rel' => '',
        'prefix' => '',
        'suffix' => '',
        'target' => '',
        'help' => '',
        'trim' => 0,
        'max_length' => '',
        'word_boundary' => 1,
        'ellipsis' => 1,
        'html' => 0,
        'strip_tags' => 0,
      ),
      'empty' => '',
      'hide_empty' => 0,
      'empty_zero' => 0,
      'hide_alter_empty' => 1,
      'link_urls' => 1,
      'link_usernames' => 1,
      'link_hashtags' => 1,
      'hashtags_url' => 'http://search.twitter.com/search?q=%23',
      'link_attributes' => 1,
      'exclude' => 0,
      'id' => 'text',
      'table' => 'twitter',
      'field' => 'text',
      'relationship' => 'none',
    ),
    'created_time' => array(
      'label' => '',
      'date_format' => 'time ago',
      'custom_date_format' => '',
      'exclude' => 0,
      'id' => 'created_time',
      'table' => 'twitter',
      'field' => 'created_time',
      'relationship' => 'none',
    ),
  ));
  $handler->override_option('sorts', array(
    'created_time' => array(
      'order' => 'DESC',
      'id' => 'created_time',
      'table' => 'twitter',
      'field' => 'created_time',
      'relationship' => 'none',
    ),
  ));
  $handler->override_option('arguments', array(
    'screen_name' => array(
      'default_action' => 'ignore',
      'style_plugin' => 'default_summary',
      'style_options' => array(),
      'wildcard' => 'all',
      'wildcard_substitution' => 'All',
      'title' => 'Tweets by @%1',
      'breadcrumb' => '',
      'default_argument_type' => 'fixed',
      'default_argument' => '',
      'validate_type' => 'none',
      'validate_fail' => 'ignore',
      'glossary' => 0,
      'ignorecase' => 0,
      'limit' => '0',
      'case' => 'none',
      'path_case' => 'none',
      'transform_dash' => 0,
      'id' => 'screen_name',
      'table' => 'twitter',
      'field' => 'screen_name',
      'validate_user_argument_type' => 'uid',
      'validate_user_roles' => array(
        2 => 0,
      ),
      'relationship' => 'none',
      'default_options_div_prefix' => '',
      'default_taxonomy_tid_term_page' => 0,
      'default_taxonomy_tid_node' => 0,
      'default_taxonomy_tid_limit' => 0,
      'default_taxonomy_tid_vids' => array(),
      'default_argument_user' => 0,
      'default_argument_fixed' => '',
      'default_argument_php' => '',
      'validate_argument_node_type' => array(
        'casetracker_basic_project' => 0,
        'casetracker_basic_case' => 0,
        'page' => 0,
        'story' => 0,
      ),
      'validate_argument_node_access' => 0,
      'validate_argument_nid_type' => 'nid',
      'validate_argument_vocabulary' => array(),
      'validate_argument_type' => 'tid',
      'validate_argument_transform' => 0,
      'validate_user_restrict_roles' => 0,
      'validate_argument_php' => '',
    ),
  ));
  $handler->override_option('filters', array(
    'protected' => array(
      'operator' => '=',
      'value' => 0,
      'group' => '0',
      'exposed' => FALSE,
      'expose' => array(
        'operator' => FALSE,
        'label' => '',
      ),
      'id' => 'protected',
      'table' => 'twitter_account',
      'field' => 'protected',
      'relationship' => 'none',
    ),
  ));
  $handler->override_option('access', array(
    'type' => 'none',
    'role' => array(),
    'perm' => '',
  ));
  $handler->override_option('cache', array(
    'type' => 'none',
  ));
  $handler->override_option('use_pager', 'mini');
  $handler->override_option('style_plugin', 'table');
  $handler->override_option('style_options', array(
    'grouping' => '',
    'override' => 1,
    'sticky' => 0,
    'order' => 'asc',
    'columns' => array(
      'profile_image_url' => 'profile_image_url',
      'text' => 'text',
      'created_time' => 'text',
    ),
    'info' => array(
      'profile_image_url' => array(
        'sortable' => 0,
        'separator' => '',
      ),
      'text' => array(
        'sortable' => 0,
        'separator' => ' &#8212; ',
      ),
      'created_time' => array(
        'sortable' => 0,
        'separator' => '',
      ),
    ),
    'default' => '-1',
  ));
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->override_option('title', 'Tweets');
  $handler->override_option('items_per_page', 20);
  $handler->override_option('path', 'tweets');
  $handler->override_option('menu', array(
    'type' => 'none',
    'title' => 'Twitter',
    'description' => '',
    'weight' => '1',
    'name' => 'navigation',
  ));
  $handler->override_option('tab_options', array(
    'type' => 'none',
    'title' => '',
    'description' => '',
    'weight' => 0,
    'name' => 'navigation',
  ));
  $handler = $view->new_display('block', 'Block', 'block');
  $handler->override_option('fields', array(
    'text' => array(
      'label' => '',
      'alter' => array(
        'alter_text' => 0,
        'text' => '',
        'make_link' => 0,
        'path' => '',
        'absolute' => 0,
        'link_class' => '',
        'alt' => '',
        'rel' => '',
        'prefix' => '',
        'suffix' => '',
        'target' => '',
        'help' => '',
        'trim' => 0,
        'max_length' => '',
        'word_boundary' => 1,
        'ellipsis' => 1,
        'html' => 0,
        'strip_tags' => 0,
      ),
      'empty' => '',
      'hide_empty' => 0,
      'empty_zero' => 0,
      'hide_alter_empty' => 1,
      'link_urls' => 1,
      'link_usernames' => 1,
      'link_hashtags' => 1,
      'hashtags_url' => 'http://search.twitter.com/search?q=%23',
      'link_attributes' => 1,
      'exclude' => 0,
      'id' => 'text',
      'table' => 'twitter',
      'field' => 'text',
      'relationship' => 'none',
    ),
    'created_time' => array(
      'label' => '',
      'date_format' => 'time ago',
      'custom_date_format' => '',
      'exclude' => 0,
      'id' => 'created_time',
      'table' => 'twitter',
      'field' => 'created_time',
      'relationship' => 'none',
    ),
  ));
  $handler->override_option('arguments', array());
  $handler->override_option('items_per_page', 5);
  $handler->override_option('use_more', 1);
  $handler->override_option('style_plugin', 'list');
  $handler->override_option('row_options', array(
    'inline' => array(
      'text' => 'text',
      'created_time' => 'created_time',
    ),
    'separator' => ' &#8212; ',
  ));
  $handler->override_option('block_description', 'Tweets');
  $handler->override_option('block_caching', -1);

  return array('tweets' => $view);
}
