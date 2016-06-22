"""
Definition of forms.
"""

from django import forms


class InvestorForm(forms.Form):
    investor_name = forms.CharField(label='Name')
    investor_org = forms.CharField(label='Organization')
    investor_email = forms.EmailField(label='Email')
    investor_companies = forms.CharField()

