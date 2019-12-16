from rest_framework import serializers

from api.models import CustomUser, Category, Article, Revision, File

class CustomUserSerializer(serializers.ModelSerializer):
    
    name = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()

    def get_name(self, obj):
        return obj.get_full_name()

    def get_role(self, obj):
        if (obj.is_staff):
            return 'manager'
        else:
            return 'staff'

    class Meta:
        model = CustomUser
        fields = (
            'id',
            'role',
            'username',
            'first_name',
            'last_name',
            'name',
            'email',
            'password',
            'phone',
            'occupation'
        )
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def update(self, instance, validated_data):
        print(instance)
        print(validated_data)
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
                print(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = "__all__"


class ArticleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Article
        fields = "__all__"


class RevisionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Revision
        fields = "__all__"


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = "__all__"
