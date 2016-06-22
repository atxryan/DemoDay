from django.contrib import admin

from .models import Startup, Founder

class FoundersInline(admin.StackedInline):
    model = Founder
    extra = 1

class StartupAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields': ['name', 'desc', 'logo', 'link', 'email', 'twitter']})
    ]
    inlines = [FoundersInline]

admin.site.register(Startup, StartupAdmin)
#admin.site.register(Slot)