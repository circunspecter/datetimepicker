{% assign page_url = page.url | split: '/' | shift | join: "/" %}
{: .menu}
- [Quick start]({{ site.baseurl }}/ "Quick start"){% if page_url == '' %}{: .active}{% endif %}
- [Reference]({{ site.baseurl }}/reference/ "Reference"){% if page_url == 'reference' %}{: .active}{% endif %}
- [Examples]({{ site.baseurl }}/examples/ "Examples"){% if page_url == 'examples' %}{: .active}{% endif %}
