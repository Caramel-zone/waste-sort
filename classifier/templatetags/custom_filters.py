from django import template

register = template.Library()

@register.filter
def get_item(dictionary, key):
    """
    Retrieves the value from the dictionary for the given key.
    """
    return dictionary.get(key, 0)
