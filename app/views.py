"""
Definition of views.
"""

from django.shortcuts import render
from django.http import HttpRequest
from django.template import RequestContext
from datetime import datetime

from .models import Startup, Founder
from .forms import InvestorForm
from django.http.response import HttpResponseRedirect
import re
import sendgrid

def home(request):
    """Renders the home page."""
    assert isinstance(request, HttpRequest)

    startup_list = Startup.objects.all()

    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = InvestorForm(request.POST)

        # check whether it's valid:
        if form.is_valid():

            companies = re.split(', ', form.cleaned_data['investor_companies'])

            for company in companies:

                client = sendgrid.SendGridClient("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")
                message = sendgrid.Mail()

                message.add_to("tereza.nemessanyi@microsoft.com")
                message.add_bcc("ryanjoy@microsoft.com")
                message.set_from("tereza.nemessanyi@microsoft.com")
                message.set_subject("[NRF Startup Showcase 2016] {0} is interested in {1}".format(form.cleaned_data['investor_org'], company))
            

                html_fragment = '<html><body>Hello,<br />{0} ({1}) at {2} is interested in {3}<br /></body></html>'
            
                message.set_html(html_fragment.format(form.cleaned_data['investor_name'], form.cleaned_data['investor_email'], form.cleaned_data['investor_org'], company))

                client.send(message)
            
            # redirect to a new URL:
            return HttpResponseRedirect('/thank-you')

    # if a GET (or any other method) we'll create a blank form
    else:
        form = InvestorForm()


    return render(
        request,
        'app/index.html',
        context_instance = RequestContext(request,
        {
            'title':'Healthcare Startup Showcase 2016',
            'startup_list' : startup_list,
            'form' : form,
            'year':datetime.now().year,
        })
    )

def thanks(request):
    """Renders the thank you page."""
    assert isinstance(request, HttpRequest)

    return render(
        request,
        'app/thanks.html',
        context_instance = RequestContext(request,
        {
            'title':'NRF Startup Showcase 2016',
            'year':datetime.now().year,
        })
    )