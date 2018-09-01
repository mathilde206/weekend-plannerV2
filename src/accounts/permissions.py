from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsOwnerOrReadOnly(BasePermission):
    message = 'You must be the user for this profile'

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user
