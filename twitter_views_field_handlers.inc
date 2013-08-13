<?php
/**
 * @file
 * Views handlers for Twitter module.
 */

/**
 * Process Twitter-style @usernames and URLs before filtering XSS.
 */
class twitter_views_handler_field_xss extends views_handler_field {
  function option_definition() {
    $options = parent::option_definition();
    $options['link_urls'] = array('default' => TRUE);
    $options['link_usernames'] = array('default' => TRUE);
    $options['link_hashtags'] = array('default' => FALSE);
    $options['hashtags_url'] = array('default' => variable_get('twitter_search', TWITTER_SEARCH) . '/search?q=%23');
    $options['link_attributes'] = array('default' => TRUE);
    return $options;
  }

  function options_form(&$form, &$form_state) {
    parent::options_form($form, $form_state);
    $form['link_urls'] = array(
      '#title' => t('Link urls to their destinations'),
      '#type' => 'checkbox',
      '#default_value' => !empty($this->options['link_urls']),
    );
    $form['link_usernames'] = array(
      '#title' => t('Link Twitter @usernames to their Twitter.com urls'),
      '#type' => 'checkbox',
      '#default_value' => !empty($this->options['link_usernames']),
    );
    $form['link_hashtags'] = array(
      '#title' => t('Link Twitter #hashtags to another url'),
      '#type' => 'checkbox',
      '#default_value' => !empty($this->options['link_hashtags']),
    );
    $form['hashtags_url'] = array(
      '#type' => 'textfield',
      '#default_value' => $this->options['hashtags_url'],
      '#process' => array('views_process_dependency'),
      '#dependency' => array('edit-options-link-hashtags' => array(TRUE)),
    );
    $form['link_attributes'] = array(
      '#title' => t('Open links in new windows/tabs and add rel="nofollow" attributes.'),
      '#type' => 'checkbox',
      '#default_value' => !empty($this->options['link_attributes']),
    );
  }

  /**
   * Processes the message through the selected options.
   */
  function render($values) {
    $value = $values->{$this->field_alias};
    if (!empty($this->options['link_urls'])) {
     $value = _filter_url($value, FILTER_DEFAULT);
    }
    // Link usernames with their profiles.
    if (!empty($this->options['link_usernames'])) {
      $value = _twitter_filter_text($value, '@', variable_get('twitter_host', TWITTER_HOST) . '/');
    }
    // Link hashtags.
    if (!empty($this->options['link_hashtags']) && valid_url($this->options['hashtags_url'])) {
      $value = _twitter_filter_text($value, '#', url($this->options['hashtags_url']));
    }
    // Add extra attributes to links.
    if (!empty($this->options['link_attributes'])) {
      $value = _twitter_filter_link($value, NULL);
    }
    // Avoid XSS within the message.
    return filter_xss($value);
  }
}

/**
 * Field handler to provide simple renderer that turns a URL into a clickable link.
 */
class twitter_views_handler_field_profile_image extends views_handler_field {
  function render($values) {
    $path = $values->{$this->field_alias};
    return theme('image', $path, '', '', NULL, FALSE);
  }
}
