from rest_framework import permissions

# #http://blog.kevinastone.com/getting-started-with-django-rest-framework-and-angularjs.html

class SafeMethodsOnlyPermission(permissions.BasePermission):
    """Only can access non-destructive methods (like GET and HEAD)"""
    def has_permission(self, request, view):
        return self.has_object_permission(request, view)

    def has_object_permission(self, request, view, obj=None):
        return request.method in permissions.SAFE_METHODS


class ManagerCanEditPermission(SafeMethodsOnlyPermission):
    """Allow everyone to list or view, but only the manager can modify existing instances"""
    def has_object_permission(self, request, view, obj=None):
        if obj is None:
            # Either a list or a create, so no author
            can_edit = True
        else:
            can_edit = request.user.is_staff
        return can_edit or super(ManagerCanEditPermission, self).has_object_permission(request, view, obj)
